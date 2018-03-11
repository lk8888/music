export const singer = state => state.singer;

export const playing = state => state.playiing;

export const fullScreen = state => state.fullScreen;

export const playList = state => state.playList;

export const currentIndex = state => state.currentIndex;

export const sequenceList = state => state.sequenceList;

export const currentSong = (state) => {
  return state.playingLisg[state.currentIndex];
};
