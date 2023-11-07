import db from '../../../db';
import { IVideoView } from '../models/view';
import { IVideoCreate } from '../models/create';

class VideoRepository {
  /**
   * Videos
   */
  public videos = db.videos;

  /**
   * Get all videos
   */
  get getVideos(): IVideoView[] {
    return this.videos;
  }

  /**
   * Get video bi id
   */
  public getVideoById = (id: string): IVideoView | void => {
    const video = this.videos.find(({ id: vId }) => Number(id) === vId);

    if (!video) {
      return;
    }

    return video;
  };

  /**
   * Update video
   */
  public updateVideo = (video: IVideoView): void => {
    const updatedVideos = this.videos.map((elem) =>
      video.id === elem.id ? video : elem
    );

    this.setVideos(updatedVideos);
  };

  /**
   * Remove video by id
   */
  public removeVideoById = (id: string): void => {
    const videos = this.videos.filter((video) => video.id !== Number(id));

    this.setVideos(videos);
  };

  /**
   * Create new video
   */
  public createVideo = (video: IVideoCreate): IVideoView | void => {
    const id = this.videos.length + 1;

    this.videos.push({
      id,
      ...video,
      createdAt: new Date(),
      publicationDate: new Date(),
      minAgeRestriction: null,
      canBeDownloaded: false,
    });

    const newVideo = this.getVideoById(id.toString());

    if (!newVideo) {
      return;
    }

    return newVideo;
  };

  /**
   * Clear video store
   */
  public clearVideoStore = (): void => this.setVideos([]);

  /**
   * Set new videos
   */
  private setVideos = (videos: IVideoView[]): void => {
    this.videos = videos;
  };
}

export default VideoRepository;
