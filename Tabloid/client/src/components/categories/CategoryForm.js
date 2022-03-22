import React, { useContext, useState } from "react";
import {
    Form,
    FormGroup,
    Card,
    CardBody,
    Label,
    Input,
    Button,
  } from "reactstrap";
import { CategoryContext } from "../providers/CategoryProvider.js";
import { useNavigate } from "react-router-dom";
import Category from "./Category.js";

export const CategoryForm = () => {
    const { addCategory } = useContext(CategoryContext);
    const [name, setName] = useState("");

    
    const navigate = useNavigate();

    const submit = (e) => {
        const Category = {
          name
        };
    
        addCategory(Category).then(() => {
          // Navigate the user back to the home route
          navigate("/");
        });
      };

      return (
        <div className="container pt-4">
          <div className="row justify-content-center">
            <Card className="col-sm-12 col-lg-6">
              <CardBody>
                <Form>
                  {/* <FormGroup>
                    <Label for="userId">User Id (For Now...)</Label>
                    <Input
                      id="userId"
                      onChange={(e) => setUserProfileId(e.target.value)}
                    />
                  </FormGroup> */}
                  <FormGroup>
                    <Label for="name">Category Name</Label>
                    <Input
                      id="name"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </FormGroup>
                </Form>
                <Button color="info" onClick={submit}>
                  SUBMIT
                </Button>
              </CardBody>
            </Card>
          </div>
        </div>
      );
}