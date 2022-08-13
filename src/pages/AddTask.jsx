import React from "react";
import ControlledForm from "../components/Froms/ControlledForm";
import { Spage, SPageContainer } from "../MainComponents/pages.style";

const AddTask = () => {
  return (
    <Spage>
      <SPageContainer>
        <ControlledForm />
      </SPageContainer>
    </Spage>
  );
};

export default AddTask;
