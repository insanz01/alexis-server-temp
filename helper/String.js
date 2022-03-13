const generateCode = (length) => {
  let result           = '';
  let characters       = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let charactersLength = characters.length;

  for ( let i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

export default { generateCode };