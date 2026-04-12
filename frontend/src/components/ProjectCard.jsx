import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

<div
  onClick={() => navigate(`/projects/${project._id}`)}
  className="cursor-pointer"
></div>