export const getCurrentTime = () => new Date();

export const formatTime = (date) =>
  date.toLocaleString('en-GB', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
