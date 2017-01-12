import { BolingbrookChurchPage } from './app.po';

describe('bolingbrook-church App', function() {
  let page: BolingbrookChurchPage;

  beforeEach(() => {
    page = new BolingbrookChurchPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
