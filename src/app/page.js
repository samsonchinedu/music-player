import AudioPlayer from "@/component/AudioPlayer/page";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles["page"]}>
      <AudioPlayer />
    </div>
  );
}
