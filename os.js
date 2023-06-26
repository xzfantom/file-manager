import os from 'node:os';

export const userName = os.userInfo().username;

export const homeDir = os.homedir();

const getCpuInfo = () => {
  const cpus = os.cpus();
  const cpuInfo = cpus.map((cpu) => {
    const { model, speed } = cpu;
    return { Model: model, 'Clock rate': `${Math.floor((speed * 100) / 1024) / 100}Ghz` };
  });
  return { Amount: cpuInfo.length, CPUS: cpuInfo };
};

export const parseOsCommand = (command) => {
  switch (command[0]) {
    case '--username':
      console.log(userName);
      break;
    case '--homedir':
      console.log(homeDir);
      break;
    case '--EOL':
      console.log(os.EOL);
      break;
    case '--cpus':
      const { Amount, CPUS } = getCpuInfo();
      console.log(`Amount: ${Amount}`);
      console.table(CPUS);
      break;
    case '--architecture':
      console.log(os.arch());
      break;
    default:
      throw new Error('Invalid input');
  }
};
