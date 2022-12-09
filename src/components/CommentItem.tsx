import Comment from "../types/Comment";

import React from "react";

// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import Typography from "@mui/material/Typography";

type Props = {
  comment: Comment;
};

const CommentItem: React.FC<Props> = ({ comment }) => {
  //   if (styled) {
  //     return (
  //       <Card className={classes.commentCard}>
  //         <CardContent>
  //           <Typography
  //             variant="body2"
  //             color="textPrimary"
  //             className={classes.commentBody}
  //             component="p"
  //           >
  //             {comment.body}
  //           </Typography>
  //           <Typography
  //             color="textSecondary"
  //             className={classes.metadata}
  //             gutterBottom
  //           >
  //             {"Posted by " +
  //               comment.author +
  //               " on " +
  //               comment.timestamp.toLocaleString()}
  //           </Typography>
  //         </CardContent>
  //       </Card>
  //     );
  //   }

  // unstyled
  return (
    <li>
      {comment.body}
      <br />
      <em>
        {"posted by " +
          comment.author +
          " on " +
          comment.timestamp.toLocaleString()}
      </em>
    </li>
  );
};

export default CommentItem;
