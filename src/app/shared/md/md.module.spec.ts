import { MdModule } from './md.module';

describe('MdModule', () => {
  let mdModule: MdModule;

  beforeEach(() => {
    mdModule = new MdModule();
  });

  it('should create an instance', () => {
    expect(mdModule).toBeTruthy();
  });
});
