export class VideoSource {
  url: string
  type: string

  constructor(url: string, type: string) {
    this.url = url
    this.type = type
  }
}

const firebaseRootUrl = "https://firebasestorage.googleapis.com/v0/b/bolingbrook-church.appspot.com/o/"

export function firebaseVideo(id: string, type: string) {
  return new VideoSource(firebaseRootUrl + id + "?alt=media", type)
}
