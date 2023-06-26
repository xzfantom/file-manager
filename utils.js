export const parseArgs = (args) => {
  const parsedArgs = {};
  args.forEach((arg) => {
    const [key, value] = arg.split('=');
    parsedArgs[key] = value;
  });
  return parsedArgs;
};

export const parseString = (str) => {
  const tokens = [];
  let currentToken = '';
  let isQuote = false;
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (char === ' ' && !isQuote) {
      tokens.push(currentToken);
      currentToken = '';
    } else if (char === '"' || char === "'") {
      isQuote = !isQuote;
    } else {
      currentToken += char;
    }
  }
  tokens.push(currentToken);
  return tokens;
};
