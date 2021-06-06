import { Walker } from "./walker";

function init(modules: {
  typescript: typeof import("typescript/lib/tsserverlibrary");
}) {
  const ts = modules.typescript;
  function create(info: ts.server.PluginCreateInfo) {
    const { languageService: tsLS } = info;
    function getClassMethodOverrides(fileName: string) {
      const program = info.project.getLanguageService().getProgram();
      if (!program) {
        return [];
      }

      const walker = new Walker(program);
      return walker.walk(fileName);
    }
    // ts.for
    return { ...tsLS, getClassMethodOverrides };
  }

  return { create };
}

export default init;

module.exports = Object.defineProperties(
  init,
  Object.getOwnPropertyDescriptors(module.exports)
);
