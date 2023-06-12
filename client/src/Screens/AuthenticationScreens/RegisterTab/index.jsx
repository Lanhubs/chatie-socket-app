import {
  Box,
  Flex,
  Image,
  FormControl,
  FormLabel,
  HStack,
  Input as InputField,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { MdOutlineCloudUpload, MdDeleteOutline } from "react-icons/md";

const Input = ({ handleChange, type, name, placeholder, label }) => {
  return (
    <FormControl>
      <FormLabel textTransform="capitalize">{label}</FormLabel>
      <InputField
        placeholder={placeholder}
        type={type}
        accept={type === "file" ? "image/*" : type}
        onChange={(e) => handleChange(e.target.value)}
        outlineColor={0}
        name={name}
        outlineOffset={0}
        border="1.5px solid rgba(0, 0, 255, 0.5)"
        p="10px"
      />
    </FormControl>
  );
};
export const fileUploaderHook = ({ placeholder }) => {
  const imageUploadRef = React.useRef();
  const [imageName, setImageName] = React.useState();
  const [image, setImage] = React.useState();
  const [profilePic, setProfilePic] = React.useState();

  const FileUpload = () => {
    return (
      <Box pos="relative">
        <Text
          fontSize={16}
          textTransform="capitalize"
          fontWeight={"500"}
          color="rgba(0, 0, 0, 0.7)"
        >
          upload image
        </Text>
        {image && (
          <>
            <Flex
              rounded={"md"}
              marginY="10px"
              height={"40px"}
              backgroundColor="gray.400"
              alignItems="center"
              padding="10px"
              justifyContent="space-between"
            >
              <Text textTransform="capitalize">delete file</Text>
              <HStack>
                {imageName}-{" "}
                <Text
                  as={MdDeleteOutline}
                  fontSize={25}
                  color="red.400"
                  onClick={() => {
                    setImageName(undefined);
                    setImage("");
                  }}
                />
              </HStack>
            </Flex>

            <Image
              src={image}
              alt=""
              height={200}
              width={"full"}
              my="5"
              borderRadius={10}
              objectFit="cover"
              overflow="hidden"
            />
          </>
        )}
        <Box
          onClick={() => {
            document.getElementById("fileupload").click();
          }}
          marginTop="1rem"
          borderRadius={10}
          border="2px solid"
          borderColor={"cyan.600"}
          cursor="pointer"
          flexDir={"column"}
          display={"flex" || "-ms-flexbox" || "-webkit-flex"}
          w="full"
          alignItems="center"
          justifyContent="center"
          height="150px"
          width="full"
        >
          <input
            onChange={({ target: { files } }) => {
              files && setImageName(files[0].name);
              // setProfileImage(files[0]);
              const fileReader = new FileReader();
              fileReader.readAsDataURL(files[0]);
              if (files) {
                fileReader.onload = () => {
                  setProfilePic(fileReader.result);
                };

                setImage(URL.createObjectURL(files[0]));
              }
            }}
            id="fileupload"
            w="full"
            placeholder={placeholder}
            type="file"
            accept="image/*"
            ref={imageUploadRef}
            hidden
            fontSize={16}
            fontWeight={"medium"}
            onFocus={() => {}}
            pos="relative"
          />
          <Text color="cyan.500" as={MdOutlineCloudUpload} fontSize={50} />
          <Text textTransform="capitalize" fontSize={18}>
            upload profile pic
          </Text>
        </Box>
      </Box>
    );
  };
  return {
    profilePic,
    FileUpload,
  };
};

export default Input;
