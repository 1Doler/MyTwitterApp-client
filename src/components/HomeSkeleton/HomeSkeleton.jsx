import { Skeleton } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";

import styles from "./HomeSkeleton.module.scss";

export const HomeSkeleton = () => {
  return (
    <div className={styles.wrapper}>
      {""}
      <div className={styles.posts}>
        {[...Array(5)].map((i, index) => (
          <Card sx={{ m: 2 }} className={styles.post} key={index}>
            <Skeleton height={300} className={styles.img} />
            <Card sx={{ maxWidth: 345, m: 2 }} className={styles.user}>
              <Avatar
                sx={{ width: 40, height: 40 }}
                alt="User"
                className={styles.avatar}
              />
              <Skeleton width={500} height={30} className={styles.title} />
            </Card>
            <Skeleton className={styles.firstText} />
            <Skeleton width={"60%"} className={styles.secondText} />
          </Card>
        ))}
      </div>
      <div className={styles.right}>
        <Card sx={{ m: 2 }} className={styles.tags}>
          <Skeleton className={styles.tag} width={"40%"} />
          {[...Array(5)].map((i, index) => (
            <Skeleton className={styles.tag} key={index} />
          ))}
        </Card>
        <Card sx={{ m: 2 }} className={styles.comments}>
          {[...Array(3)].map((i, index) => (
            <div className={styles.comment} key={index}>
              <div className={styles.user}>
                <Avatar
                  sx={{ width: 40, height: 40 }}
                  alt="User"
                  className={styles.userAvatar}
                />
                <Skeleton className={styles.userName} width={"40%"} />
              </div>
              <Skeleton className={styles.text} width={"80%"} />
              <Skeleton className={styles.text} width={"60%"} />
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
};
