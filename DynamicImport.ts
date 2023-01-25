const dynamicImport = async (specifier: string) => {
  const dynamicImportModule = new Function(
    "specifier",
    "return import(specifier)"
  );
  return await dynamicImportModule(`${specifier}`);
};

export default dynamicImport;
