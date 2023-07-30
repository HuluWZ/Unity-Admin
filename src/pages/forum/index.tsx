import React, { useState } from "react";
import PageView from "../../components/PageView";
import { useForum } from "../../hooks/useForum";
import LoadingComponent from "../../components/LoadingComponent";
import CategoriesView from "./CategoryList";
import FormDialog from "./CategoryModal";
import { AddCircleRounded } from "@mui/icons-material";
import ConfirmModal from "../../components/ConfirmModal";


const Categories = () => {
  const { forums, isLoading, error, deleteForumMutation, createForumMutation, updateForumMutation } = useForum();
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);



  if (isLoading) return (
    <PageView
      title="Forums"
      backPath="/app/dashboard"
      actions={[
        {
          icon: <AddCircleRounded style={{ fontSize: "1rem" }} />,
          label: "Add Forum",
          handler: () => setOpen(true),
          otherProps: {
            sx: {
              ml: "auto",
              fontSize: "10px",
            },
            variant: "contained",
          },
        },
      ]}
    >
      <LoadingComponent />
    </PageView>
  )

  return (
    <PageView
      title="Forums"
      backPath="/app/dashboard"
      actions={[
        {
          icon: <AddCircleRounded style={{ fontSize: "1rem" }} />,
          label: "Add Forums",
          handler: () => setOpen(true),
          otherProps: {
            sx: {
              ml: "auto",
              fontSize: "10px",
            },
            variant: "contained",
          },
        },
      ]}
    >
      <FormDialog
        open={open}
        handleClose={() => {
          setOpen(false)
          setSelectedCategory(null)
        }
        }
        handleAdd={createForumMutation}
        selectedCategory={selectedCategory}
        handleEdit={updateForumMutation}
        setSelectedCategory={setSelectedCategory}


      />

      <ConfirmModal
        open={openConfirm}
        handleClose={() => setOpenConfirm(false)}
        handleConfirm={() => {
          deleteForumMutation(selectedCategory?.id);
          setOpenConfirm(false);
        }}
        title="Delete Forum"
        description="Are you sure you want to delete this forum?"
        confirmText="Delete"
        cancelText="Cancel"
      />


      <CategoriesView
        categories={forums}
        setSelectedCategory={setSelectedCategory}
        setOpen={setOpen}
        setOpenConfirm={setOpenConfirm}
      />

      
    </PageView>
  );
};



export default Categories;