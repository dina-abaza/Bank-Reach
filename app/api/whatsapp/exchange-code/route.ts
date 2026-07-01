import { NextRequest, NextResponse } from 'next/server';
import { ExchangeCodeRequest, ExchangeCodeResponse, MetaTokenResponse } from '@/types/whatsapp';

export async function POST(request: NextRequest): Promise<NextResponse<ExchangeCodeResponse>> {
  try {
    // Parse request body
    const body = await request.json();
    const { code, redirect_uri } = body as ExchangeCodeRequest;

    // Validate code
    if (!code || typeof code !== 'string' || code.trim() === '') {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing or invalid authorization code',
        },
        { status: 400 }
      );
    }

    // Get environment variables
    const clientId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID;
    const clientSecret = process.env.FACEBOOK_APP_SECRET;
    const apiVersion = process.env.NEXT_PUBLIC_FACEBOOK_API_VERSION || 'v25.0';

    // Validate environment variables
    if (!clientId) {
      console.error('Missing NEXT_PUBLIC_FACEBOOK_APP_ID');
      return NextResponse.json(
        {
          success: false,
          message: 'Server configuration error',
        },
        { status: 500 }
      );
    }

    if (!clientSecret) {
      console.error('Missing FACEBOOK_APP_SECRET');
      return NextResponse.json(
        {
          success: false,
          message: 'Server configuration error',
        },
        { status: 500 }
      );
    }

    // Validate redirect_uri from frontend
    if (!redirect_uri || typeof redirect_uri !== 'string' || redirect_uri.trim() === '') {
      console.error('Missing or invalid redirect_uri from frontend');
      return NextResponse.json(
        {
          success: false,
          message: 'Missing redirect_uri',
        },
        { status: 400 }
      );
    }

    // Normalize the redirect_uri to ensure consistency
    // Remove trailing slash if present (except for root path)
    const normalizedRedirectUri = redirect_uri.trim().replace(/\/$/, '');
    
    console.log('=== DEBUG INFO ===');
    console.log('Original redirect_uri from frontend:', redirect_uri);
    console.log('Normalized redirect_uri:', normalizedRedirectUri);
    console.log('Client ID:', clientId);
    console.log('API Version:', apiVersion);
    console.log('Code length:', code.trim().length);
    console.log('Code (first 30 chars):', code.trim().substring(0, 30) + '...');
    
    // Send debug info to debug server
    try {
      await fetch('http://localhost:3001/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'debug',
          sessionId: 'whatsapp-redirect-uri-mismatch',
          timestamp: new Date().toISOString(),
          data: {
            originalRedirectUri: redirect_uri,
            normalizedRedirectUri,
            clientId,
            apiVersion,
            codeLength: code.trim().length,
            codePrefix: code.trim().substring(0, 30) + '...',
          }
        })
      });
    } catch (debugErr) {
      console.log('Failed to send debug log:', debugErr);
    }
    
    console.log('==================');

    // Prepare request to Meta Graph API using FormData
    const tokenUrl = `https://graph.facebook.com/${apiVersion}/oauth/access_token`;
    
    const formData = new URLSearchParams();
    formData.append('client_id', clientId);
    formData.append('client_secret', clientSecret);
    formData.append('code', code.trim());
    formData.append('grant_type', 'authorization_code');
    formData.append('redirect_uri', normalizedRedirectUri);

    console.log('Sending request to Meta API with redirect_uri:', normalizedRedirectUri);

    // Log the exact request being sent to Meta API
    const requestBody = formData.toString();
    console.log('Meta API Request Body (without secret):', 
      requestBody.replace(clientSecret, '***'));
    
    try {
      await fetch('http://localhost:3001/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'meta_api_request',
          sessionId: 'whatsapp-redirect-uri-mismatch',
          timestamp: new Date().toISOString(),
          data: {
            url: tokenUrl,
            method: 'POST',
            redirectUri: normalizedRedirectUri,
            requestBody: requestBody.replace(clientSecret, '***'),
          }
        })
      });
    } catch (debugErr) {
      console.log('Failed to send request debug log:', debugErr);
    }

    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });

    // Handle Meta API response
    if (!response.ok) {
      let errorData = {};
      try {
        errorData = await response.json();
      } catch (e) {
        console.error('Failed to parse Meta API error response:', e);
      }
      
      // Log the error response from Meta API
      try {
        await fetch('http://localhost:3001/log', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'meta_api_error',
            sessionId: 'whatsapp-redirect-uri-mismatch',
            timestamp: new Date().toISOString(),
            data: {
              status: response.status,
              statusText: response.statusText,
              error: errorData,
              redirectUri: normalizedRedirectUri,
            }
          })
        });
      } catch (debugErr) {
        console.log('Failed to send error debug log:', debugErr);
      }
      
      console.error('Meta API error details:', {
        status: response.status,
        statusText: response.statusText,
        url: tokenUrl,
        error: errorData,
        clientId: clientId,
        apiVersion: apiVersion,
        codeLength: code.trim().length,
        redirectUri: normalizedRedirectUri,
      });

      let errorMessage = 'Failed to exchange authorization code';
      let detailedMessage = '';
      
      if (response.status === 400) {
        errorMessage = 'Invalid or expired authorization code';
        const metaError = errorData as { error?: { message?: string }; message?: string };
        detailedMessage = metaError.error?.message || metaError.message || '';
      } else if (response.status === 401) {
        errorMessage = 'Invalid Facebook app credentials';
        detailedMessage = 'Check FACEBOOK_APP_SECRET and NEXT_PUBLIC_FACEBOOK_APP_ID';
      } else if (response.status === 403) {
        errorMessage = 'Access denied by Meta API';
        const metaError = errorData as { error?: { message?: string }; message?: string };
        detailedMessage = metaError.error?.message || '';
      }

      return NextResponse.json(
        {
          success: false,
          message: errorMessage,
          details: detailedMessage,
          debug: {
            clientId: clientId,
            apiVersion: apiVersion,
            codeLength: code.trim().length,
            redirectUri: normalizedRedirectUri,
          }
        },
        { status: response.status }
      );
    }

    // Parse successful response
    const tokenData = (await response.json()) as MetaTokenResponse;

    if (!tokenData.access_token) {
      return NextResponse.json(
        {
          success: false,
          message: 'No access token received from Meta API',
        },
        { status: 500 }
      );
    }

    // Return success response
    return NextResponse.json({
      success: true,
      access_token: tokenData.access_token,
    });

  } catch (error) {
    console.error('Exchange code error:', error);

    // Handle specific error types
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid request format',
        },
        { status: 400 }
      );
    }

    if (error instanceof TypeError && error.message.includes('fetch')) {
      return NextResponse.json(
        {
          success: false,
          message: 'Network error while connecting to Meta API',
        },
        { status: 503 }
      );
    }

    // Generic error response
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
      },
      { status: 500 }
    );
  }
}

// Add OPTIONS method for CORS preflight
export async function OPTIONS(): Promise<NextResponse> {
  return NextResponse.json({}, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}