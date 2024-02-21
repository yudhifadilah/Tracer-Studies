"use client"
import React from 'react';
import {Textarea, Spacer} from '@nextui-org/react';

export default function page() {
  return (
    <div>
        <Textarea
         label="Dear,"
        placeholder="Thank you for completing the survey. Your responses have been successfully recorded."
          className="max-w-xs"
        />
          <Spacer y={1} />
    </div>
  );
}
