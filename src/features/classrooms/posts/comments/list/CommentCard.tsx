import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import { blue } from "@mui/material/colors";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonIcon from "@mui/icons-material/Person";
import React from "react";
import { Comment } from "../../../../../app/models/Comment";
import MenuMini from "../../../../common/UI/MenuMini";
import AlertDialog from "../../../../common/UI/AlertDialog";
import DeleteIcon from "@mui/icons-material/Delete";

interface CommentCardProps {
  comment: Comment;
}

const moreOptions = [
  {
    text: "Xoá",
  },
];

const CommentCard = (props: CommentCardProps) => {
  const [anchorElMore, setAnchorElMore] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenMoreMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElMore(event.currentTarget);
  };

  const handleCloseMoreMenu = () => {
    setAnchorElMore(null);
  };
  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
        textAlign: "start",
        borderWidth: 2,
        transition: "transform 0.3s, border-color 0.3s, box-shadow 0.3s",
        "&:hover": {
          borderColor: "primary.main",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
          transform: "translateY(-4px)",
        },
        position: "relative",
        m: "10px 0",
      }}
      variant="outlined"
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: blue[800] }} aria-label="person-icon">
            <PersonIcon />
          </Avatar>
        }
        action={
          // <IconButton
          //   aria-label="more"
          //   sx={{
          //     transition: "color 0.2s",
          //     "&:hover": {
          //       color: blue[800],
          //     },
          //     position: "absolute",
          //     top: 8,
          //     right: 8,
          //   }}
          //   onClick={handleOpenMoreMenu}
          // >
          //   <MoreVertIcon />
          // </IconButton>
          <AlertDialog
          iconButton={<DeleteIcon />}
          titleButton="XOÁ"
          alertDialogTitle="Xoá nhận xét?"
          alertDialogDescription="Bạn có chắc chắn muốn xoá nhận xét này không?"
          negation="Huỷ"
          affirmation="Xoá"
        />
        }
        title={`${props.comment.user?.firstName} ${props.comment.user?.lastName}`}
        subheader={props.comment.createDate.toString()}
      />
      {/* <MenuMini
        id="menu-more"
        anchorEl={anchorElMore}
        handleCloseMenu={handleCloseMoreMenu}
        options={moreOptions}
      /> */}
      <CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
          dangerouslySetInnerHTML={{ __html: props.comment.content }}
        >
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CommentCard;
