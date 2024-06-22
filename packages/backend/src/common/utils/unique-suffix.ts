



export function generateUniqueSuffix(){
  return (new Date()).toISOString() + '-' + Math.round(Math.random() * 1E9);
}