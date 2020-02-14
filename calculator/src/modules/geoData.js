import config from './config';

const getGeoDataAsync = async () => {
  try {
    const requestUrl = `${config.ipInfoBaseUrl}${config.ipInfoToken}`;
    const responseData = await fetch(requestUrl);
    const geoData = await responseData.json();
    // console.log('getGeoData() geoData: ', geoData);
    return { zipCode: +geoData.postal };
  } catch (err) {
    // console.error('getGeoData() fetch Error ::::: ', err);
    return { zipCode: 85001 }; // If failed to get zipCode -> use Arizona (AZ) ZIP Code
  }
};

export default { getGeoDataAsync };
