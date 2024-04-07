export async function isPicValid(url: string) {
  try {
    const res = await fetch(url);
    const buff = await res.blob();
  
    return buff.type.startsWith('image/')
  }
  catch (err) {
    console.error(err)
  }
  return false;
}