const format = (contents, fileNames) => {
  if (contents.length < 2) {
    return contents.join('');
  }

  const formattedContent = contents.map((content, index) => {
    return `==> ${fileNames[index]} <==\n${content}\n`;
  });

  return formattedContent.join('\n');
};

exports.format = format;
