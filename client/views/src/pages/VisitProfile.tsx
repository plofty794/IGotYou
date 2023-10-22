import { useParams } from "react-router-dom";

function VisitProfile() {
  const { id } = useParams();
  console.log(id);
  return <div>VisitProfile</div>;
}

export default VisitProfile;
