export default function getChildProcessDebugPort() {
  const debuggerArg = process.execArgv.find(args => args.startsWith("--inspect-brk"));
  if (!debuggerArg) return;

  const match = debuggerArg.match(/--inspect-brk=(\d+)/);
  if (!match) return;

  const port = Number(match[1]);
  return port + 1;
}
