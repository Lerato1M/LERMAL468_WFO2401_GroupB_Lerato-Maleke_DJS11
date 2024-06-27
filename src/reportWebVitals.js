// Import ReportHandler type from 'web-vitals' package
import { ReportHandler } from 'web-vitals';

// Define reportWebVitals function with optional onPerfEntry parameter of type ReportHandler
const reportWebVitals = (onPerfEntry) => {
  // Check if onPerfEntry is provided and is a function
  if (onPerfEntry && typeof onPerfEntry === 'function') {
    // Dynamically import web-vitals package
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // Call each web-vitals function with onPerfEntry callback
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    }).catch(error => {
      // Handle error if web-vitals import fails
      console.error('Failed to load web-vitals', error);
    });
  }
};

// Export the reportWebVitals function as default
export default reportWebVitals;
