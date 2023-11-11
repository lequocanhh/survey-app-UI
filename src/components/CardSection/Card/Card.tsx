import classNames from "classnames/bind";
import styles from "./Card.module.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import StorageIcon from "@mui/icons-material/Storage";
import { Divider, IconButton } from "@mui/material";
import { SurveyInfo } from "../../../types/survey";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Popover from "@mui/material/Popover";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import { useActionStore, useSurveyCardStore } from "../../../store/store";
import { EDIT } from "../../../constants/constant";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const cx = classNames.bind(styles);

type Props = {
  survey: SurveyInfo;
  index: number;
};

const Card = ({ survey, index }: Props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { setAction } = useActionStore();
  const { setSurveyCard } = useSurveyCardStore();
  const navigate = useNavigate();

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const handleOpenEditPage = (event) => {
    event.stopPropagation();
    setAction(EDIT);
    navigate(`form/edit/${survey.id}`);
  };

  const handleDeleteSurvey = async(event) => {
    event.stopPropagation();
    try {
      const response = await axios.delete(`http://localhost:8080/api/v1/survey/${survey.id}`)
      if(response.data.status === 200){
        alert("delete survey successfully")
          setSurveyCard([]);
      }
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <div key={index} className={cx("container")}>
      <img src="" className={cx("image")} />
      <div className={cx("content")}>
        <h4>{survey.title}</h4>
        <div className={cx("more-info")}>
          <div className={cx("content-left")}>
            <StorageIcon />
            <p className={cx("description")}>{survey.description}</p>
          </div>
          <IconButton onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Box
              sx={{
                width: "200px",
                maxWidth: 360,
                bgcolor: "background.paper",
              }}
            >
              <nav>
                <List>
                  <ListItem disablePadding>
                    <ListItemButton onClick={handleOpenEditPage}>
                      <ListItemIcon>
                        <EditIcon />
                      </ListItemIcon>
                      <ListItemText primary="Edit" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton onClick={handleDeleteSurvey}
                      sx={{
                        "&:hover": {
                          backgroundColor: "#c22424",
                          color: "black",
                        },
                      }}
                    >
                      <ListItemIcon>
                        <DeleteIcon />
                      </ListItemIcon>
                      <ListItemText primary="Delete" />
                    </ListItemButton>
                  </ListItem>
                </List>
              </nav>
              <Divider />
            </Box>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default Card;
