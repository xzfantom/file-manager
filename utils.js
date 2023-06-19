export const parseArgs = (args) => {
  const parsedArgs = {};
  args.forEach((arg) => {
    const [key, value] = arg.split('=');
    parsedArgs[key] = value;
  });
  return parsedArgs;
};
