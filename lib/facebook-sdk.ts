/**
 * Facebook SDK Loader
 * Dynamic loading of Facebook SDK for WhatsApp Embedded Signup
 */

import { FacebookSDK } from '@/types/whatsapp';

declare global {
  interface Window {
    FB?: FacebookSDK;
    fbAsyncInit?: () => void;
  }
}

/**
 * Load Facebook SDK dynamically
 * @returns Promise that resolves when SDK is loaded
 */
export const loadFacebookSDK = (): Promise<FacebookSDK> => {
  return new Promise((resolve, reject) => {
    // Check if SDK is already loaded
    if (window.FB) {
      resolve(window.FB);
      return;
    }

    // Create script element
    const script = document.createElement('script');
    script.src = 'https://connect.facebook.net/en_US/sdk.js';
    script.async = true;
    script.defer = true;
    script.crossOrigin = 'anonymous';

    // Set up initialization callback
    window.fbAsyncInit = () => {
      if (!window.FB) {
        reject(new Error('Facebook SDK failed to load'));
        return;
      }

      // Initialize Facebook SDK
      window.FB.init({
        appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || '',
        autoLogAppEvents: true,
        xfbml: true,
        version: process.env.NEXT_PUBLIC_FACEBOOK_API_VERSION || 'v25.0',
      });

      resolve(window.FB);
    };

    // Handle script load errors
    script.onerror = () => {
      reject(new Error('Failed to load Facebook SDK'));
    };

    // Add script to document
    document.body.appendChild(script);
  });
};

/**
 * Initialize Facebook SDK
 * @returns Promise with initialized Facebook SDK
 */
export const initializeFacebookSDK = async (): Promise<FacebookSDK> => {
  try {
    const fb = await loadFacebookSDK();
    return fb;
  } catch (error) {
    console.error('Failed to initialize Facebook SDK:', error);
    throw error;
  }
};

/**
 * Check if Facebook SDK is available
 * @returns boolean indicating if SDK is loaded
 */
export const isFacebookSDKLoaded = (): boolean => {
  return typeof window !== 'undefined' && !!window.FB;
};

/**
 * Get Facebook SDK instance
 * @returns Facebook SDK instance or undefined
 */
export const getFacebookSDK = (): FacebookSDK | undefined => {
  return window.FB;
};