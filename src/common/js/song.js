export default class Song {
  constructor({id, mid, singer, name, album, duration, image, url}) {
    this.id = id;
    this.mid = mid;
    this.singer = singer;
    this.name = name;
    this.album = album;
    this.duration = duration;
    this.image = image;
    this.url = url;
  }
};

export function createSong (musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: `http://dl.stream.qqmusic.qq.com/C400${musicData.strMediaMid}.m4a?vkey=FA513520B75632713FAC077354475E09E4900AE632CB79773370BC2B8CA2F72A2E80A6E67F2DB843C51817D821F084939DF6BADD9DEA29FD&guid=464558590&uin=0&fromtag=66`
  });
};

function filterSinger (singer) {
  let ret = [];
  if (!singer) {
    return '';
  }
  singer.forEach((item) => {
    ret.push(item.name);
  });
  return ret.join('/');
}
