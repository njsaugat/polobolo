import { ErrorBoundary } from "react-error-boundary";
import { useParams } from "react-router-dom";
import { FallbackErrorBoundary } from "../../../components/Shared/FallbackErrorBoundary";
import Posts from "./Posts";

const PostsByTag = () => {
  const { tag } = useParams();
  return (
    <div>
      <h1 className="my-5 text-2xl text-center md:text-3xl">
        Explore <span className="font-bold">#{tag}</span> Posts
      </h1>
      <ErrorBoundary
        FallbackComponent={FallbackErrorBoundary}
        onReset={() => {}}
      >
        <Posts tag={tag} />
      </ErrorBoundary>
    </div>
  );
};

export default PostsByTag;
