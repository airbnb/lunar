export default function getSourcePath(filePath) {
  const basePath = `https://github.com/airbnb/lunar/blob/master/`;

  if (filePath.startsWith('./')) {
    filePath = filePath.slice(2);
  }

  if (filePath.includes('#')) {
    filePath = filePath.split('#')[0];
  }

  return basePath + filePath + '#L1';
}
