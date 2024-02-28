"use client";
import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import CreatePost from "./CreatePost.jsx";


function Modalbutton() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [backdrop, setBackdrop] = React.useState('opaque')
  const [modalPlacement, setModalPlacement] = React.useState("top");
  const [scrollBehavior, setScrollBehavior] = React.useState("outside");

  return (
    <>
  
      <Button onPress={onOpen} >Open Modal</Button>
      <Modal  id="Modal" isOpen={isOpen}  placement={modalPlacement} backdrop={backdrop} className={"z-50"}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody value={scrollBehavior}>
             
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export {Modalbutton};


