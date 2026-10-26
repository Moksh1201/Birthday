import { useCallback, useEffect, useState } from "react";
import { SCENE_COUNT } from "../data/theme";
import { ProgressIndicator } from "./ProgressIndicator";
import { SceneManager } from "./SceneManager";
import { SceneNavigation } from "./SceneNavigation";
import { SoundProvider, SoundToggle } from "./SoundController";
import { GiftOpeningScene } from "./scenes/GiftOpeningScene";
import { HammerGameScene } from "./scenes/HammerGameScene";
import { BirthdayPartyScene } from "./scenes/BirthdayPartyScene";
import { AppreciationWallScene } from "./scenes/AppreciationWallScene";
import { HeartPhotoGallery } from "./scenes/HeartPhotoGallery";
import { FlirtyComplimentsScene } from "./scenes/FlirtyComplimentsScene";
import { BirthdayCakeScene } from "./scenes/BirthdayCakeScene";
import { SurpriseGiftsScene } from "./scenes/SurpriseGiftsScene";
import { FinalBirthdayMessage } from "./scenes/FinalBirthdayMessage";

export function BirthdayExperience() {
  const [runId, setRunId] = useState(0);
  const [scene, setScene] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [scene]);

  const goNext = useCallback(() => setScene((s) => Math.min(s + 1, SCENE_COUNT - 1)), []);
  const goPrev = useCallback(() => setScene((s) => Math.max(s - 1, 0)), []);
  const jump = useCallback((index: number) => setScene(Math.max(0, Math.min(index, SCENE_COUNT - 1))), []);

  const replay = useCallback(() => {
    setRunId((id) => id + 1);
    setScene(0);
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  const renderScene = () => {
    switch (scene) {
      case 0:
        return <GiftOpeningScene onComplete={goNext} />;
      case 1:
        return <HammerGameScene onComplete={goNext} />;
      case 2:
        return <BirthdayPartyScene onComplete={goNext} />;
      case 3:
        return <AppreciationWallScene onComplete={goNext} />;
      case 4:
        return <HeartPhotoGallery onComplete={goNext} />;
      case 5:
        return <FlirtyComplimentsScene onComplete={goNext} />;
      case 6:
        return <BirthdayCakeScene onComplete={goNext} />;
      case 7:
        return <SurpriseGiftsScene onComplete={goNext} />;
      case 8:
        return <FinalBirthdayMessage onReplay={replay} />;
      default:
        return null;
    }
  };

  return (
    <SoundProvider key={runId}>
      <div className="relative min-h-[100dvh] w-full overflow-x-hidden bg-burgundy text-ivory">
        <SoundToggle />
        <SceneNavigation current={scene} onPrev={goPrev} onNext={goNext} />
        <ProgressIndicator current={scene} onJump={jump} />
        <SceneManager sceneKey={scene + runId * 100}>{renderScene()}</SceneManager>
      </div>
    </SoundProvider>
  );
}
