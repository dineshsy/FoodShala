import React from 'react'
import classes from './AnimatedPages.module.css'
export default function AnimatedPages(props) {
          let classname = [classes.IntroPage];
          if (props.disAppear) {
              classname.push(classes.FadeOut);
          }
          if (props.explore) {
              classname.push(classes.DisAppear);
          }
    return (
        <div className={!props.explore ? classes.AnimatedPages : ""}>
            <div className={classname.join(" ")}>
                {props.mainComponent}
            </div>
            <div
                className={
                    props.explore ? classes.ExplorePage : classes.DisAppear
                }
            >{props.subComponent}</div>
        </div>
    );
}
