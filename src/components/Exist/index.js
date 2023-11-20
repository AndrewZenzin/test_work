import React, {Fragment} from "react";

export const Exist: React.FC = ({children, when}) => (
	<Fragment>{when ? children : null}</Fragment>
);
export default Exist;