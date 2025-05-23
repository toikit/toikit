export class BaseModule {
  app: any;
  name: string = '';
  prepare(){}
  register(){}
  setup(){}
  mounted(){}
  build(config?: any): Array<String>{
    return [];
  }
}
