import { BFContentful, IScreenFields } from '../../../services/contentful';
import { Routes } from '../../../router/routes';
import perfMon from '../../../utils/performance/monitoring';

export type BFIScreenBottomButton = {
  icon?: string;
  label: string;
  type: 'Internal' | 'External';
  link?: string;
};

export interface BFIScreen {
  route: Routes;
  bottomButtons?: BFIScreenBottomButton[];
}

export async function FetchScreens(): Promise<BFIScreen[]> {
  return perfMon('fetch screen contentful', _FetchScreens);
}

async function _FetchScreens(): Promise<BFIScreen[]> {
  try {
    const results = await BFContentful.getEntries<IScreenFields>({ content_type: 'screen' });
    return results.items.map((item) => ({
      route: item.fields.name as Routes,
      bottomButtons: item?.fields?.footer?.flatMap((footer) => {
        // if visible and has at least 1 link
        if (footer.fields.visible && (footer.fields.linkExternal || footer.fields.linkInternal)) {
          return [
            {
              icon: footer.fields.icon?.fields.file.url,
              label: footer.fields.label,
              type: footer.fields.type,
              link:
                footer.fields.type === 'External'
                  ? footer.fields.linkExternal
                  : footer.fields.linkInternal?.fields.name
            }
          ];
        } else {
          return [];
        }
      })
    }));
  } catch (e) {
    // contentful is not connected or not working properly
    // log it in analitics
    return [];
  }
}
