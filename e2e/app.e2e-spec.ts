import { D3DemoPage } from './app.po';

describe('d3-demo App', function() {
  let page: D3DemoPage;

  beforeEach(() => {
    page = new D3DemoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
