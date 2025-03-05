import { useEffect, useRef, useState } from "react";
import * as Icons from "../../Svg/Icons";
import { FaPlay, FaPause } from "react-icons/fa6";
import { MdReplay } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

interface Props {
  closeVideo?: (x: boolean) => void;
  src?: string;
  isCloseIcon?: boolean;
}

const CustomVideoPlayer: React.FC<Props> = ({
  closeVideo = () => {},
  src = "/nature.mp4",
  isCloseIcon = true,
}: Props) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const rangeRef = useRef<HTMLInputElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [hasEnded, setHasEnded] = useState<boolean>(false);
  const [showPlayPause, setShowPlayPause] = useState<boolean>(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
      setHasEnded(false);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (!document.fullscreenElement) {
        videoRef.current.requestFullscreen().catch((err) => {
          console.error("Error attempting to enable fullscreen mode:", err);
        });
      } else {
        document.exitFullscreen().catch((err) => {
          console.error("Error attempting to exit fullscreen mode:", err);
        });
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration);
      updateRangeBackground();
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = (parseFloat(e.target.value) / 100) * duration;
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
    updateRangeBackground();
  };

  const updateRangeBackground = () => {
    if (rangeRef.current) {
      const thumbWidth = 12;
      const value = duration ? (currentTime / duration) * 100 : 0;

      rangeRef.current.style.setProperty("--value", `${value}%`);

      const min = Number(rangeRef.current.min);
      const max = Number(rangeRef.current.max);
      const currentVal = Number(rangeRef.current.value);

      const fillPercentage = ((currentVal - min) / (max - min)) * 100;

      const adjustedFillPercentage =
        fillPercentage - (thumbWidth / rangeRef.current.offsetWidth) * 100;

      rangeRef.current.style.backgroundSize = `${fillPercentage}% 100%`;
    }
  };

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      videoElement.addEventListener("timeupdate", handleTimeUpdate);
      videoElement.addEventListener("ended", () => {
        setHasEnded(true);
      });
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener("timeupdate", handleTimeUpdate);
        videoElement.removeEventListener("ended", () => {
          setHasEnded(true);
        });
      }
    };
  }, []);

  const handleReplay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
      setHasEnded(false);
    }
  };

  const handleMouseEnter = () => {
    setShowPlayPause(true);
    if (timeoutId) clearTimeout(timeoutId);
  };

  const handleMouseLeave = () => {
    const id = setTimeout(() => {
      setShowPlayPause(false);
    }, 700);
    setTimeoutId(id);
  };

  return (
    <div
      className="w-full h-full bg-video-bg rounded-[10px] relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        className="w-full rounded-[10px] object-cover h-full"
        onClick={togglePlayPause}
      >
        <source src={src} type="video/mp4" />
      </video>
      {/* Play + Pause button */}
      {showPlayPause && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {hasEnded ? (
            <button
              onClick={handleReplay}
              className="w-[50px] h-[50px] rounded-full bg-orange-1 flex justify-center items-center"
            >
              <MdReplay className="text-white-1 text-[28px]" />
            </button>
          ) : (
            <button
              onClick={togglePlayPause}
              className={`w-[50px] h-[50px] rounded-full ${
                isPlaying ? "bg-orange-1" : "bg-cyan-1"
              } flex justify-center items-center`}
            >
              {!isPlaying ? (
                <FaPlay className="text-white-1 text-[22px]" />
              ) : (
                <FaPause className="text-white-1 text-[28px]" />
              )}
            </button>
          )}
        </div>
      )}
      {/* Always visible controls */}
      <div className="absolute w-full px-3 bottom-4 flex flex-col">
        <div className="flex absolute mb-3 right-4 bottom-1 justify-between items-center">
          <button onClick={toggleMute} className="mr-2">
            {isMuted ? (
              <Icons.Mute className="w-[26px] h-[24px]" />
            ) : (
              <Icons.UnMute className="w-[26px] h-[24px]" />
            )}
          </button>
          <button onClick={toggleFullscreen} className="flex items-center">
            <Icons.FullScreen className="w-[26px] h-[26px]" />
          </button>
        </div>
        <input
          ref={rangeRef}
          type="range"
          min="0"
          max="100"
          value={duration ? (currentTime / duration) * 100 : 0}
          onChange={handleProgressChange}
          className="w-full range-slider"
        />
      </div>
      {/* close video  */}
      {isCloseIcon && (
        <button
          onClick={() => closeVideo(false)}
          className="absolute right-4 top-2"
        >
          <RxCross2 className="text-[22px] transition-all duration-200 text-black-1 hover:text-cyan-1" />
        </button>
      )}
    </div>
  );
};

export default CustomVideoPlayer;
