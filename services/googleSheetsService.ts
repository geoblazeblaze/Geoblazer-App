
import { CartItem, UserInfo } from '../types';
import { GOOGLE_SCRIPT_URL } from '../constants';

export const submitOrderToSheet = async (userInfo: UserInfo, items: CartItem[]): Promise<boolean> => {
  try {
    const payload = {
      timestamp: new Date().toISOString(),
      userName: userInfo.name,
      userPhone: userInfo.phone,
      userEmail: userInfo.email,
      notes: userInfo.notes || '',
      items: items.map(item => ({
        sku: item.sku,
        name: item.name,
        qty: item.quantity,
        price: item.price,
        subtotal: item.price * item.quantity,
        pageUrl: item.pageUrl // Send the pageUrl from the sheet
      })),
      total: items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    };

    // In a real environment, this would be a POST to your Google Apps Script Web App URL
    console.log('Submitting to Google Sheet:', payload);
    
    // Simulating API call
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // Common for Google Apps Script
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    // Since 'no-cors' doesn't let us see the status, we assume success if no error thrown
    return true; 
  } catch (error) {
    console.error('Error submitting order:', error);
    return false;
  }
};
