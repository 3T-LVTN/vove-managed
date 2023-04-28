import React, { useState } from "react";
import {Box, Button, Divider, Input, Popover, Text} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

export interface SearchBoxProps {
  readonly setSelected: any
}
export const SearchBox = (props: SearchBoxProps) => {
  const [popoverOpened, setPopoverOpened] = useState(false);

  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address: any) => {

    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode(address);
    const { lat, lng } = await getLatLng(results[0]);
    console.log("---------");

    props.setSelected({ lat, lng });

  };

  return (
      <Popover opened={ popoverOpened } position="bottom" width="90%" transitionProps={{ transition: 'pop' }}>
        <Popover.Target>
          <div
            onFocusCapture={() => setPopoverOpened(true)}
            onBlurCapture={() => setPopoverOpened(false)}
          >
          <Input
            icon={<IconSearch />}
            placeholder="Search an adress"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            radius="md"
            disabled={!ready}
          />
        </div>
      </Popover.Target>
        <Popover.Dropdown>
          {status === "OK" &&
            data.map(({place_id, description}) => (
              // <div onClick={handleSelect} key={place_id}>
              //   <Text>{description}</Text>
              //   <Divider size="xs" color="gray.2" />
              // </div>
              // TODO: User can click on an option and can show Maker
              <Button
                key={place_id}
                fullWidth
                variant="subtle"
                style={{textAlign: "left"}}
                onClick={() => handleSelect}
              >
                {description}
              </Button>
          ))}
        </Popover.Dropdown>
      </Popover>
  );
}

export default SearchBox;
