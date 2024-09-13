export const ITEMS = [
  {
    id: "1",
    no: "1", // No diisi dengan nilai yang sama seperti id
    label:
      "Agriculture, forestry and fishing Pertanian, Kehutanan, dan Perikanan",
    children: [
      {
        id: "01",
        no: "01",
        label:
          "Crop and animal production, hunting an services activities Pertanian tanaman, peternakan, perburuan dan kegiatan terkai",
      },
      {
        id: "02",
        no: "02",
        label: "Forestry and Logging Kehutanan dan pemanenan kayu",
        children: [
          {
            id: "1.1.1",
            no: "1.1.1",
            label:
              "This division includes the production of roundwood as well as the extraction and gathering of wild growing non-wood forest products...",
            fileType: "pdf",
            children: [
              {
                id: "02.1",
                no: "02.1",
                label: "Silviculture and other forestry activities",
                fileType: "pdf",
              },
              {
                id: "02.10",
                no: "02.10",
                label: "Silviculture and other forestry activities",
                fileType: "pdf",
                children: [
                  {
                    id: "02.10.01",
                    no: "02.10.01",
                    label: `This class includes:  
                        ${"\n"} - growing of standing timber: planting, replanting, transplanting, thinning and conserving of forests and timber
                        tracts
                        ${"\n"} - growing of coppice, pulpwood and fire wood
                        ${"\n"} - operation of forest tree nurseries These activities can be carried out in natural or planted forests. This class excludes:
                        ${"\n"} - growing of Christmas trees, see 01.29
                        ${"\n"} - operation of tree nurseries, except for forest trees, see 01.30
                        ${"\n"} - gathering of mushrooms and other wild growing non-wood forest products, see 02.30
                        ${"\n"} - production of wood chips and particles, see 16.1`,
                    fileType: "pdf",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
