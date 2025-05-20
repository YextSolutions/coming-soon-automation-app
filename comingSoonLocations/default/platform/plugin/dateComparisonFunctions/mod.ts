

export function isWithinGoogleRange(dateString: string, days: number = `${{googleDaysBeforeLaunch}}`): boolean {
  const today = new Date();   // Get today's date dynamically within the function
  
  const inputDate = new Date(dateString);   // Parse the input date
  
  const differenceInMs = Math.abs(today.getTime() - inputDate.getTime());   // Calculate the difference in milliseconds

  const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);   // Convert milliseconds to days (1000ms * 60s * 60min * 24hr)
  
  const optIn = differenceInDays <= days   // Check if the difference is less than or equal to the specified days
  
  return optIn;
}



export function isWithinYelpRange(dateString: string, days: number = `${{yelpDaysBeforeLaunch}}`): boolean {
  const today = new Date();   // Get today's date dynamically within the function
  
  const inputDate = new Date(dateString);   // Parse the input date
  
  const differenceInMs = Math.abs(today.getTime() - inputDate.getTime());   // Calculate the difference in milliseconds

  const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);   // Convert milliseconds to days (1000ms * 60s * 60min * 24hr)
  
  const optIn = differenceInDays <= days   // Check if the difference is less than or equal to the specified days
  
  return optIn;
}
export function isWithinFacebookRange(dateString: string, days: number = `${{facebookDaysBeforeLaunch}}`): boolean {
  const today = new Date();   // Get today's date dynamically within the function
  
  const inputDate = new Date(dateString);   // Parse the input date
  
  const differenceInMs = Math.abs(today.getTime() - inputDate.getTime());   // Calculate the difference in milliseconds

  const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);   // Convert milliseconds to days (1000ms * 60s * 60min * 24hr)
  
  const optIn = differenceInDays <= days   // Check if the difference is less than or equal to the specified days
  
  return optIn;
}
export function openDateToday(dateString: string, days: number = `${{extendedNetworkDaysBeforeLaunch}}`): boolean {
  // RON
  const today = new Date();   // Get today's date dynamically within the function
  
  const inputDate = new Date(dateString);   // Parse the input date
  
  const differenceInMs = Math.abs(today.getTime() - inputDate.getTime());   // Calculate the difference in milliseconds

  const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);   // Convert milliseconds to days (1000ms * 60s * 60min * 24hr)
  
  const optIn = differenceInDays <= days   // Check if the difference is less than or equal to the specified days
  
  return optIn;
}