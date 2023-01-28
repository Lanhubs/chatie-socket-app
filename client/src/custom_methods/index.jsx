function imageGetter(name) {
    return new URL(`${name}`, import.meta.url).href
 }


 export default imageGetter