// function to get image url if present otherwise give default url
export const imageSource = (user) => {
  if (user.image) return user.image.url;
  else return "/images/logo.png";
};
