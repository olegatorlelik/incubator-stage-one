import db from '../../../db';
import { IVideoView } from '../models/view';
import { IVideoCreate } from '../models/create';

class VideoRepository {
  /**
   * Get all videos
   */
  get getVideos(): IVideoView[] {
    return db.getData('videos');
  }

  /**
   * Get video bi id
   */
  public getVideoById = (id: string): IVideoView | void => {
    const videos = db.getData('videos');

    const video = videos.find(({ id: vId }) => Number(id) === vId);

    if (!video) {
      return;
    }

    return video;
  };

  /**
   * Update video
   */
  public updateVideo = (video: IVideoView): void => {
    const videos = db.getData('videos');

    const updatedVideos = videos.map((elem) =>
      video.id === elem.id ? video : elem
    );

    db.updateData('videos', updatedVideos);
  };

  /**
   * Remove video by id
   */
  public removeVideoById = (id: string): void => {
    const videos = db.getData('videos');

    const updatedVideos = videos.filter((video) => video.id !== Number(id));

    db.updateData('videos', updatedVideos);
  };

  /**
   * Create new video
   */
  public createVideo = (video: IVideoCreate): IVideoView | void => {
    const videos = db.getData('videos');

    const id = videos.length + 1;

    db.updateData('videos', [
      ...videos,
      {
        id,
        ...video,
        createdAt: new Date().toISOString(),
        publicationDate: new Date().toISOString(),
        minAgeRestriction: null,
        canBeDownloaded: false,
      },
    ]);

    const newVideo = this.getVideoById(id.toString());

    if (!newVideo) {
      return;
    }

    return newVideo;
  };

  /**
   * Clear video store
   */
  public clearVideoStore = (): void => db.updateData('videos', []);
}

export default VideoRepository;
