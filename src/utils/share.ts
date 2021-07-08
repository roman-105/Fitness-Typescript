import Share from 'react-native-share';
import ImgToBase64 from 'react-native-image-base64';

// bfapp://workout?utm_source=app&utm_medium=referral&utm_content=workout
// workout → The actual page / URL we link to
// utm_source → the source. For sharing links: ‘app’
// utm_medium → For sharing links: ‘referral’
// utm_content → For sharing links: '{contentType}'

type contentType =
  | 'Club'
  | 'Finished workout'
  | 'Lifestyle item'
  | 'Nutrition item'
  | 'Workout'
  | 'Lesson';

function processUrl(content_type: string, url: string): string {
  return `bfa://${url}?utm_source=app&utm_medium=referral&utm_content=${content_type}`;
}

export async function share(content_type: contentType, url: string, image?: string) {
  const imageBase64 = image && (await ImgToBase64.getBase64String(image));

  const shareOptions = {
    title: `${content_type} - Basic Fit`,
    message: `Hey you, this ${content_type} made me think of you, so I thought I would share 😉 ${processUrl(
      content_type,
      url
    )}`,
    url: image ? `data:image/jpeg;base64,${imageBase64}` : '',
    subject: 'Basic Fit'
  };

  Share.open(shareOptions);
}
