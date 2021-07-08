import { sha256 } from 'js-sha256';
import { BF_GYM_TIME_BOOKING_URL, BF_DOMAIN } from '../constants';
import env from '../environment';

const getSSOData = (peopleId: string): string => {
  const hmac = sha256.hmac.create(env.BASICFIT_SSO_SECRET);
  hmac.update(`null:${peopleId}:null`);
  return `vgsso?virtuagym-member-id=null&external-id=${peopleId}&club-member-id=null&sig=${hmac.hex()}`;
};

function removeBaseUrl(url: string) {
  const split = url.split(`${BF_DOMAIN}/`);
  return split[split.length - 1];
}

export const GenerateSSOUrl = (peopleId: string, returl: string): string => {
  const ssoData: string = getSSOData(peopleId);
  return `${BF_DOMAIN}/${ssoData}&returl=/${removeBaseUrl(returl)}`;
};

export const getGymTimeReservationUrl = (
  peopleId: string,
  clubId?: string,
  time?: number
): string => {
  let params = '';
  if (clubId && time) {
    params = encodeURIComponent(`?timeslot=${time}&clubid=${clubId}`);
  }
  return `${GenerateSSOUrl(peopleId, BF_GYM_TIME_BOOKING_URL)}${params}`;
};
