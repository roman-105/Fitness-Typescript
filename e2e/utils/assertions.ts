import { by, expect, element } from 'detox';

const AllIcons: string[] = ['profile', 'card', 'search', 'notifications', 'settings'];

const assertHeaderComposition = async (routeName: string, whiteListIcons: string[]) => {
  const expectationPromises = AllIcons.map((icon) => {
    const iconElem = element(by.id(`${routeName}-header-icon-${icon}`));
    return whiteListIcons.includes(icon)
      ? expect(iconElem).toExist()
      : expect(iconElem).toNotExist();
  });
  await Promise.all(expectationPromises);
};

export default { assertHeaderComposition };
